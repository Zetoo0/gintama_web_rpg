import { JobEnemy } from "../JobEnemy";
import { Player } from "../Player";
import { FC, useEffect, useState } from 'react';

interface FightingArenaProps {
    enemy : JobEnemy[] | null;
    player : Player | null;
}

const FightArenaPage: FC<FightingArenaProps> = ({enemy, player}) => {

    const [isAttack, setIsAttack] = useState(false);

    return(
        <div>
            <h1>Fight</h1>
            {
            enemy?.map((e, index) => (
                    <div>
                        <h2>{e.enemy_name}</h2>
                        <p>{e.stats.anti_funny}</p>
                        <p>{e.stats.intelligence}</p>
                        <p>{e.stats.strength}</p>
                        <p>{e.description}</p>
                        {
                            isAttack ? <p>Attacking</p> : <p>Not attacking</p>
                        }
                    </div>
                ))
            }

            <h1>Player stats</h1>
            <p><strong>Strength: </strong>{player?.equipment.accessory?.Strength + player?.equipment.clothing?.Strength + player?.equipment.gadget?.Strength + player?.equipment.weapon?.Strength}</p>
            <p><strong>Craziness: </strong>{player?.equipment.accessory?.Craziness + player?.equipment.clothing?.Craziness + player?.equipment.gadget?.Craziness + player?.equipment.weapon?.Craziness}</p>
            <p><strong>Intelligence: </strong>{player?.character_informations.inteligence}</p>
        
            <div>
                <h2>Choice</h2>
                <button onClick={() => setIsAttack(!isAttack)}/*onClick={/*Do some attacking stuff(choose enemy if need, or attack all if can}*/>Attack</button>
                <button /*onClick={Pop up 3 joke and choose one what could be good  from the description(but be warned that maybe the enemy doesnt like jokes}*/>Try A Joke</button>
                <button /*onClick={Pop up 3 intelligent stuff and choose one but be warned that maybe the enemy hates them xd}*/>Tell Some Intelligent Stuff</button>
            </div>
        </div>
    )
}

export default FightArenaPage