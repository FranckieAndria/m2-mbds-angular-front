export class Score {
    _id!: string;
    note!: number;
    remarque!: string;
    rendu!: Boolean;
    dateDeCreation!: Date;
    titre!: string;
    etudiant!: string;
    professeur!: {
        matiere: {
            intitule: string
        },
        _id: string,
        nom: string,
        prenom: string,
        email: string,
        imagePath: string
    };
    dateDeRendu!: Date
}