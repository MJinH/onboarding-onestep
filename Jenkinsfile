pipeline {
    agent any

    environment {
        REGION = 'us-west-1'
        EKS_API = 'https://41C10C029BC55F048D25A68B14D7BE91.sk1.us-west-1.eks.amazonaws.com'
        EKS_CLUSTER_NAME = 'my-cluster'
        EKS_JENKINS_CREDENTIAL_ID = 'fb6bd7de-6265-4c63-857f-412e161012db'
        ECR_PATH = '913524939383.dkr.ecr.us-west-1.amazonaws.com/test-ecr'
        ECR_IMAGE = 'onestep'
        AWS_CREDENTIAL_ID = 'd9feac58-0552-456d-ae63-f8948a09d20c'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_PATH}", "${AWS_CREDENTIAL_ID}") {
                        image = docker.build("${ECR_PATH}/${ECR_IMAGE}")
                    }
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_PATH}", "${AWS_CREDENTIAL_ID}") {
                        image.push("v${env.BUILD_NUMBER}")
                    }
                }
            }
        }
        
        stage('CleanUp Images') {
            steps {
                sh """
                docker rmi ${ECR_PATH}/${ECR_IMAGE}:v$BUILD_NUMBER
                docker rmi ${ECR_PATH}/${ECR_IMAGE}:latest
                """
            }
        }
        
        stage('Deploy to k8s') {
            steps {
                script {
                    withKubeConfig([credentialsId: "${EKS_JENKINS_CREDENTIAL_ID}",
                                    serverUrl: "${EKS_API}",
                                    clusterName: "${EKS_CLUSTER_NAME}"]) {
                        sh "sed 's/IMAGE_VERSION/v${env.BUILD_ID}/g' ./infra/client.yaml > client-output.yaml"
                        sh "aws eks --region ${REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}"
                        sh "kubectl apply -f client-output.yaml"
                        sh "rm client-output.yaml"

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