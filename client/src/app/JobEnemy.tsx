interface EnemyStat{
    anti_funny : number;
    intelligence : number;
    strength : number;
}
export interface JobEnemy{
    _id ?: string;
    job_name : string;
    enemy_name : string;
    stats : EnemyStat;
}