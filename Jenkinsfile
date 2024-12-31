pipeline {
    agent any

    environment {
        REGION = PROCESS.ENV.REGION
        EKS_API = PROCESS.ENV.EKS_API
        EKS_CLUSTER_NAME = PROCESS.ENV.CLUSTER_NAME
        EKS_JENKINS_CREDENTIAL_ID = PROCESS.ENV.JENKINS_CREDENTIAL
        ECR_PATH = PROCESS.ENV.ECR_PATH
        AWS_CREDENTIAL_ID = PROCESS.ENV.AWS_CREDENTIAL
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Test ECR Credentials') {
            steps {
                script {
                    withAWS(credentials: "${AWS_CREDENTIAL_ID}", region: "${REGION}") {
                        sh 'aws sts get-caller-identity'
                    }
                }
            }
        }
        
        stage('Docker Build & Push Client') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}") {
                        // Client Docker Build
                        def clientImage = docker.build("${ECR_PATH}/client:${env.BUILD_NUMBER}", "-f ./client/Dockerfile ./client")
                        clientImage.push()
                        clientImage.push('latest')
                    }
                }
            }
        }

        stage('Docker Build & Push Server') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}") {
                        // Server Docker Build
                        def serverImage = docker.build("${ECR_PATH}/server:${env.BUILD_NUMBER}", "-f ./server/Dockerfile ./server")
                        serverImage.push()
                        serverImage.push('latest')
                    }
                }
            }
        }
        
        stage('CleanUp Images') {
            steps {
                sh """
                docker rmi ${ECR_PATH}/client:${env.BUILD_NUMBER}
                docker rmi ${ECR_PATH}/client:latest
                docker rmi ${ECR_PATH}/server:${env.BUILD_NUMBER}
                docker rmi ${ECR_PATH}/server:latest
                """
            }
        }
        
        stage('Deploy to k8s') {
            steps {
                script {
                    withKubeConfig([credentialsId: "${EKS_JENKINS_CREDENTIAL_ID}",
                                    serverUrl: "${EKS_API}",
                                    clusterName: "${EKS_CLUSTER_NAME}"]) {
                        // Deploy Client
                        sh "sed 's/IMAGE_VERSION/v${env.BUILD_ID}/g' ./infra/client.yaml > client-output.yaml"
                        sh "aws eks --region ${REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}"
                        sh "kubectl apply -f client-output.yaml"
                        sh "rm client-output.yaml"

                        // Deploy Server
                        sh "sed 's/IMAGE_VERSION/v${env.BUILD_ID}/g' ./infra/server.yaml > server-output.yaml"
                        sh "aws eks --region ${REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}"
                        sh "kubectl apply -f server-output.yaml"
                        sh "rm server-output.yaml"
                    }
                }
            }
        }
    }
}
