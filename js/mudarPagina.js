var divPai=document.getElementsByClassName("content");

const swap = () => {
    var flag = false;

  for(let children of divPai[0].childNodes){
    if(children.id && !children.classList.contains("hidden")){
        children.classList.add("hidden")
        flag = true
    }
    else if(children.id && flag){
        children.classList.remove("hidden")
        flag = false
    }
  }
  if (flag){
    divPai[0].childNodes[1].classList.remove("hidden")
    flag = false
  }
}