import  { useState } from 'react';

function Compteur() {
    const [compte, setCompte] = useState(0);

    return (
        <div>
            <p>Compte: {compte}</p>
            <button onClick={() => setCompte(compte + 1)}>Incrémenter</button>
        </div>
    );
}

export default Compteur;

