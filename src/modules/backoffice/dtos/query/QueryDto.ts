export class QueryDTo {   
    constructor(
        public query: any,
        public field: string,
        public sort: string,
        public skip: number=0,
        public take: number =25
    ){}
}