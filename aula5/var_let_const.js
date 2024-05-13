//var
function func1(par){
  if (par % 2 == 0){
    var minhaVar = 'é par';
  } else {
    var minhaVar = 'não é par';
  }

  return minhaVar;
}

//let
function func2(par){
  let minhaVar = 'é par';
  if (par % 2 == 0){
    minhaVar = 'é par'
  } else {
    let minhaVar = 'não é par';
  }

  return minhaVar;
}

//const
function func3(par){
  if (par % 2 == 0){
    const minhaVar = 'é par';
  } else {
    const minhaVar = 'não é par';
  }

  return minhaVar;
}

//alterar const
const meuArray = [];

consolge.log(meuArray);

meuArray[0] = 'primeiro'

consolge.log(meuArray);
