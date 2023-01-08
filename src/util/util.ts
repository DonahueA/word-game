
import { english_dict } from "./words";
export async function isEnglish(word: string){
    return english_dict.has(word.toUpperCase())
}


export function generateRule() : string{

    const rules = ["AF","AG","AL","AM","AN","AP","AR","AS","AT","AZ","BE","BI","CA","CE","CI","CO","DA","DE","DI","DO","EA","EB","EC",
    "ED","EF","EG","EL","EM","EN","EP","ER","ES","ET","EW","FA","FE","FI","HA","HE","HI","IF","IL","IN","IP","IR","IS",
    "IT","KA","KE","LA","LE","LI","LO","LU","MA","ME","MI","MO","NA","NE","NI","NO","OD","OR","PA","PE","PI","RA","RE",
    "RI","RO","SA","SE","SI","SO","SU","TA","TE","UR","US","UT","VE","WA","WE"];

    
    return rules[Math.floor(Math.random()*rules.length)] || "AF";
}


