function karger(graph){
    while(graph.length > 2){
        let choise = [...randomizedChoise(graph)];
        graph = contract(graph, choise[0], choise[1]);
        
    }
    return graph;
}
function randomizedChoise(graph){
    function randomize(min, max) {
        // returns a random index betwen two numbers
        return Math.floor(min + Math.random() * (max - min + 1));
    }
    function getIndex(num){
        // gos through the graph to search the index of the elemnt
        for(let v = 0; v < graph.length; v++ ){
            if(typeof graph[v][0] === 'object'){
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
    if(choise1 === 'undefined' || choise2 === 'undefined'){
        console.log('undefined');
    }else{
        return [choise1, choise2];
    }
}
function contract(graph, c1, c2){
    // contracts two vertcies from the graph ranom choise 1 & 2(c1 , c2)
    function combain(val1, val2){
        // chack if val is an array if it is push each element to temp
        // else push it as a value
        let temp = new Array();
        if(typeof val1 === 'object'){
            for( num of val1){
                temp.push(num);
            }
        }else{
            temp.push(val1);
        }
        if(typeof val2 === 'object'){
            for(let num of val2){
                temp.push(num);
            }
        }else{
            temp.push(val2);
            }
        return temp;
        }
    
    const len = Math.max(graph[c1].length, graph[c2].length); // the longest vertcie
    var temp = [];
    // sets the first vertcie as a super vertice with the names of all previous contracted vertcies
    temp.push(combain(graph[c1][0],graph[c2][0]));
    for(let edge = 1; edge < len; edge++){
        // iterates from 1 to longest vertcies length and push only the edges the should not contract
        
        if(graph[c1][edge] != graph[c2][0]){
            if(graph[c1][edge]){
                temp.push(graph[c1][edge]);
            }
        }
        if(graph[c2][edge] != graph[c1][0]){
            if(graph[c2][edge]){
                temp.push(graph[c2][edge]);
            }
        }
    }
    // sets one of the vertcies in the graph the contracted to its updated values deletes the other vertcie and returns to recursion 
    // with the updated graph
    if(typeof temp[0] === 'object'){
        var newArray = temp.filter((item, index) => {
            if (index === 0) {
                // Keep the first inner array intact
                return true;
            } else {
                // Remove elements from the main array that are present in the first inner array
                return !temp[0].includes(item);
            }
        });
    }
    graph[c1] = newArray;
    graph.splice(c2, 1);
    return graph;

}
// smaller testing array 
var graph = [['1', '2', '3', '4'], 
['2', '1', '4'],
['3', '1', '4'],
['4', '1', '2', '3']];
// const ans = karger(graph);
// console.log(ans[0].length - 1);
// console.log(ans[0], '\n', ans[1]);
// example

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
        let temp = line.split(/\s+/).map(Number);
        temp.pop();
        graph.push(temp);
        
    }
    // console.log(typeof graph);
    const ans = karger(graph);
    console.log(ans[0].length -1);
    console.log(ans[1].length -1);
    

});
