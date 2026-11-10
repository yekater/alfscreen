export type Params={demand:number,capacity:number,attendance:number,price:number,cost:number,opex:number,capex:number};
export function calculate(p:Params){
 const visits=Math.min(Math.max(0,p.demand),Math.max(0,p.capacity))*Math.max(0,Math.min(100,p.attendance))/100;
 const revenue=visits*p.price, direct=visits*p.cost, margin=revenue-direct, monthly=margin-p.opex;
 const cumulative=Array.from({length:13},(_,i)=>-p.capex+monthly*i);
 const payback=cumulative.findIndex((v,i)=>i>0&&v>=0);
 return {visits,revenue,direct,margin,monthly,cumulative,payback,breakeven:p.price>p.cost?Math.ceil(p.opex/(p.price-p.cost)):null, peak:Math.max(0,-Math.min(...cumulative))};
}
