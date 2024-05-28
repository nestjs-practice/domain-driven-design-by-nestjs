export namespace BoardArticleEvent {
  export class Created {
    constructor(readonly userId: number) {
      this.userId = userId;
    }
  }
}
