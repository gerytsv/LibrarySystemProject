export class BookDTO {
  public id: string;

  public title: string;

  public author: string;

  public year: string;

  public description: string;

  public freeToBorrow: boolean;

  public borrowedBy: any;

  public cover: string; // URL to random cover
}
