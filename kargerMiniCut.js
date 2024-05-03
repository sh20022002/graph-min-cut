const fs = require('fs');
// deals with the text file and convert to an array
fs.readFile('graphCut\\graph.txt', 'utf-8', (err, data) => {
    if(err){
        console.error(err);
        return;
    }
    
    const graph = [];
// splits to lines and than to elemnts with spaces between
    for(let line of data.split('\n')){
        let temp = line.split(/\s+/);
        temp.pop();
        graph.push(temp);
        
    }
    const ans = kargerAlgo(graph);
    console.log(ans)
    

});
// smaller testing array 
const tgraph = [['1', '2', '3', '4'], 
['2', '1', '4'],
['3', '1', '4'],
['4', '1', '2', '3']];


function kargerAlgo(graph){
    // main function with functions inside ---recursive---
    
    // exit condition when there is 2 elemens left in the graph
    if(graph.length < 3){
        return graph;
    }else{
        // calls the randome choise function to slect a random edge to contract
        randomizedChoise();
    }

    function randomizedChoise(){
        function randomize(min, max) {
            // returns a random index betwen two numbers
            return Math.floor(min + Math.random() * (max - min + 1));
        }
        function getIndex(num){
            // gos through the graph to search the index of the elemnt
            for(let v = 0; v < graph.length; v++ ){
                if(typeof graph[v][0] !== 'string'){
                    // chacks that the first cell is not a string for the next itertion
                    if(graph[v][0].includes(num)){
                        return v;
                    }
                    // if is not a vertcie that wasnt contracted the first elemnt will be a string that represents the vertcie
                }else if(graph[v][0] === num) return v; //returns the index
            }
        }
        // choose a random vertcie and than picks a random vertice that conect to first via an edge 
        let choise1 = randomize(0, graph.length - 1);
        let choise = randomize(1, graph[choise1].length - 1);
        let choise2 = getIndex(graph[choise1][choise]);
        // calls the contract function with the graph and the indexes of the two vertcies to contract
        return contract(graph, choise1, choise2);
    }
    

    function contract(graph, c1, c2){
        // contracts two vertcies from the graph ranom choise 1 & 2(c1 , c2)
        let v1 = graph[c1]; //the vertcie in the index of c1 
        let v2 = graph[c2]; //the vertcie in the index of c2
        const len = Math.max(v1.length, v2.length); // the longest vertcie
        var temp = [];
        // sets the first vertcie as a super vertice with the names of all previous contracted vertcies
        temp.push([...v1[0], ...v2[0]]);
        for(let edge = 1; edge < len; edge++){
            // iterates from 1 to longest vertcies length and push only the edges the should not contract
            if(v1[edge] != v2[0]){
                if(v1[edge]){
                    temp.push(v1[edge]);
                }
            }
            if(v2[edge] != v1[0]){
                if(v2[edge]){
                    temp.push(v2[edge]);
                }
            }
        }
        // sets one of the vertcies in the graph the contracted to its updated values deletes the other vertcie and returns to recursion 
        // with the updated graph
        graph[c1] = temp;
        graph.splice(c2, 1);
        return kargerAlgo(graph);
    }
}