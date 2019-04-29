export interface Game {
    GameID: string; // required field with minimum 5 characters
    Name: string; //
    OnNintendoSw: boolean;
    OnPC: boolean;
    OnPS4: boolean;
    OnXboxOne: boolean;
    PictureUrl: string;
    Publisher: string;
    Rating: string;
    Release_date: Date;
    Release_year: string;
    Platform: string;
    Quantity: number;
}
