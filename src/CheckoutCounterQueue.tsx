import React, { useEffect, useState } from "react";

export const CheckoutCounterQueue = ()=> {
    const [newCheckoutItem, setNewCheckoutItem] = useState<number>(0);
    const [checkoutQueues, setCheckoutQueue] = useState<number[][]>([[],[],[],[],[]]);
  
  
  const handleCheckOut = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(newCheckoutItem <= 0) return;
    let minSum = Infinity;
    let minSumArray : number[];
    checkoutQueues.map( (queue) => {
      const currentSum =  queue.reduce((sum, value) => sum + value, 0);
  
        if(currentSum < minSum){
          minSum = currentSum;
          minSumArray = queue;
        }
      })
  
      setCheckoutQueue(
        prev => prev.map(line => line === minSumArray ? [...line, newCheckoutItem] : line)
      )
  }
  
  useEffect(()=> {
    const interval = setInterval(()=> {
        setCheckoutQueue(prev => prev.map( queue => 
          [queue[0] - 1, ...queue.slice(1)].filter(el => el > 0)
          ));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [])
  
     return ( 
      <>
      <form
      onSubmit={handleCheckOut}
      >
      <input 
      key="item-input"
      type="number"
      value={newCheckoutItem}
      onChange={(e) => setNewCheckoutItem(Number(e.currentTarget.value !== "" ? e.currentTarget.value : undefined ))}
      ></input>
      <button>Checkout</button>
      </form>
  
      <div className="checkout-lines">
        {
          Array(5).fill(0).map((_, index) => {
            return(
              <>
              <div key={index} className="checkout-line">Checkout {index+1}
              {checkoutQueues[index]?.map(
                (people ,i) => {
                  return(
                  <div key={i}>
                    {people}
                  </div>
                  )
                }
              )}</div>
             
              </>
            )
          })
        }
      </div>
      
      </>
    )
    
  }