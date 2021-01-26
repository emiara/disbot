exports.monty = function (tall){
    if (tall == 0){
        return("velg en av mine tre dører: 1,2 eller 3");
    }else if (!isNaN(tall)){
        her=tall-1
        var riktig = Math.floor(Math.random()*3)
        var array = [0, 0, 0]
        array[riktig]=1
        array[tall-1]=1
        var forste_0 = (element)=> (element == 0)
        var pos = array.findIndex(forste_0)
        var temp = [0,0,0]
        temp[tall-1]=1
        temp[pos]=1
        var pos2 = temp.findIndex(forste_0)
        
        return (`Interessant, du valgte ${tall}. Bak ${pos+1} er det tomt. Har du lyst å bytte til ${pos2+1}? Ja/Nei`)
    }else{
        if (tall=="Ja"){
            if (pos2==riktig){
                return("Gratulerer du vant en apekatt")
            }else{
                return("Synd, du tapte, kålhode")
            }
        }
        if (tall == "Nei"){
            if (her==riktig){
                return("Gratulerer du vant en apekatt")
            }else{
                return("Synd, du tapte, kålhode")
            }
        }
        else{
            return("du svarte noe uforståelig, du får en geit")
        }
    }
}
