// const fs = require('fs');

// fs.readFile('graphCut\\graph.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
    
//     const graph = [];

//     for(let line of data.split('\n')){
//         let temp = line.split(/\s+/);
//         temp.pop();
//         graph.push(temp);
        
//     }
//     const ans = kargerAlgo(graph);
//     console.log(ans)
    

// });
// test
const tgraph = [['1', '2', '3', '4'], 
['2', '1', '4'],
['3', '1', '4'],
['4', '1', '2', '3']];
console.log(kargerAlgo(tgraph));

function kargerAlgo(graph){
    if(graph.length < 3) return graph;
    else randomizedChoise();

    function randomizedChoise(){
        let choise1 = Math.floor(Math.random() * graph.length);
        let choise2 = Math.floor(Math.random() * graph.length);
        if(choise1 === choise2) randomizedChoise();
        else return contract(graph, choise1, choise2);
    }


    function contract(graph, c1, c2){
        let v1 = graph[c1]; //will have the element in the place of c1 - 1
        let v2 = graph[c2]; //will have the element in the place of c2 - 1
        const len = Math.max(v1.length, v2.length);
        var temp = [];
        temp.push(v1[0]);
        for(let edge = 1; edge < len; edge++){
            // if(!v2.includes(v1[edge]) && !temp.includes(v1[edge])){
            if(!(v1[edge] === v2[0])){
                if(v1[edge]) temp.push(v1[edge]);
            }else if(!v1.includes(v2[edge]) && !temp.includes(v2[edge])){
                if(v2[edge]) temp.push(v2[edge]);
            // }
        }
        graph.splice(c2, 1);
        // graph[c1] = temp;
        return kargerAlgo(graph);
    }
}

