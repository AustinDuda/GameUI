/*export const bankHandler = (id: string, quantity: number, setPlayerBankContext: React ) => {
    setPlayerBankContext(prevBank => {
        const existingObject = prevBank.find(obj => obj.id === id);

        if (existingObject) {
          return prevBank.map(obj => {
            if (obj.id === id) {
              return { ...obj, quantity: obj.quantity + quantity };
            }
            return obj;
          });
        }
      
        return [...prevBank, { id: id, name: 'Golden Key', quantity: quantity }];
      });
};*/