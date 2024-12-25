import { Position } from "./position.model.js"
import { paginate } from '../helpers/paginate.js';
export const find_all_position = async (page, document_per_page)=>{
    let all_position = await paginate(Position, {}, page, document_per_page)
    return all_position;
}