function calcularTotal(itens, cupom) {
let subtotal = 0;

for (let i = 0; i < itens.length; i++) {
subtotal += itens[i].preco * itens[i].quantidade;
}

if (itens.length === 0 || subtotal < 0) {
throw new Error("Carrinho inválido");
}

let desconto = 0;
if (cupom === "PROMO10") {
// CORRIGIDO: antes descontava R$ 10,00 fixos, agora desconta 10% do subtotal
desconto = subtotal * 0.10;
}

let frete = 15;
// CORRIGIDO: antes usava '>' e deixava R$ 100 exatos pagarem frete indevidamente; agora usa '>='
if (subtotal >= 100) {
frete = 0;
}

let total = subtotal - desconto + frete;

// CORRIGIDO: antes retornava o valor sem arredondar; agora limita a 2 casas decimais
return Number(total.toFixed(2));
}

module.exports = { calcularTotal };