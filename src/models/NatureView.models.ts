/**je cree ma classe pour la modelisation*/
export class NatureView {
    constructor(
        public  name: string,
        public date: Date,
        public  description: string,
        public longitude: number,
        public  latitude: number,
        public  immagePath: string
    )
    {}
}
