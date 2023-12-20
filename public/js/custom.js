$(function(){
    var pbo = true
    var buntik = {}

    function reset() {
        $(".chkbox").each((_index,element)=>{
            $(element).prop("checked", false)
        })
        buntik = {}
        $("#output-összeg").text("")
        $("#output-idő").text("")
        $("#output-ticket").text("")
        $("#output-ticket-do").text("")
    }
    reset()
    $("#pbo").prop("checked", true)
    $(".radio").on("change", function(){
        pbo = $(this).prop("id") == "pbo"
    })
    //console.log($(".lista").css("opacity"))
    $(".chkbox").on("change", function(_,_newval){
        let checked = $(this).is(":checked")
        let rovid = $(this).prop("id")
        if (checked) {buntik[rovid] = true} else {delete buntik[rovid]} 
        let outputossz = Number($("#output-összeg").text().split("Ft")[0])
        outputossz = checked?(outputossz+(pbo?Number($(this).attr("penz1")):Number($(this).attr("penz2")))):(outputossz-(pbo?Number($(this).attr("penz1")):Number($(this).attr("penz2"))))
        let buntikJoined = Object.keys(buntik).join(", ")
        $("#output-összeg").text(`${outputossz} Ft`)
        if (Number($(this).attr("borton1"))>0) {
        $("#output-idő").text(checked?((Number($("#output-idő").text().split(" ")[0]) + (pbo?Number($(this).attr("borton1")):Number($(this).attr("borton2")))) + " nap(perc)"):((Number($("#output-idő").text().split(" ")[0]) - (pbo?Number($(this).attr("borton1")):Number($(this).attr("borton2")))) + " nap(perc)"))}
        if (outputossz>1000000) {
            $("#output-ticket").text(`${Math.floor(outputossz/1000000)}x: /ticket ID 1000000 ${buntikJoined}${outputossz%1000000!=0?`\n/ticket ID ${outputossz%1000000} ${buntikJoined}`:``}`)
        } else {$("#output-ticket").text(`/ticket ID ${outputossz} ${buntikJoined}`)}
        $("#output-ticket").html($("#output-ticket").html().replace(/\n/g, "<br/>"))
        $("#output-ticket-do").text(`/do ${buntikJoined} ${outputossz}Ft`)
    })
    $("#reset").on("click", function(){
        reset()
    })
})