exports.monty = function (tall){
    if (tall == 0){
        return("velg en av mine tre dører: 1,2 eller 3");
    }else if (!isNaN(tall)){
        var riktig = Math.floor(Math.random()*3)
        var array = [0, 0, 0]
        array[riktig]=1
        var forste_0 = (element)=> (element == 0) &&(element != tall-1)
        var pos = array.findIndex(forste_0)
        var temp = [0,0,0]
        temp[tall-1]=1
        temp[pos]=1
        var pos2 = array.findIndex(forste_0)
        
        return (`Interessant, du valgte ${tall}. Bak ${pos+1} er det tomt. Har du lyst å bytte til ${pos2+1}? Ja/Nei`)
    }
}
