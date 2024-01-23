import { AggregateRoot } from '../../common/aggregate-root';

export class Posts extends AggregateRoot {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly author: string,
    readonly content: string,
    readonly categories: string,
    readonly idDraft: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super();
  }
  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      content: this.content,
      categories: this.categories,
      idDraft: this.idDraft,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
