import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import BookStore from './book-store.entity';

@Entity({ name: 'store_books' })
@Unique('book_store_unique', ['bookID', 'bookStoreID'])
export default class StoreBook {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  public ID: bigint;

  @Column({ type: 'bigint', nullable: false, name: 'book_id' })
  public bookID: bigint;

  @Column({ type: 'bigint', nullable: false, name: 'book_store_id' })
  public bookStoreID: bigint;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => BookStore, (target) => target.store_books)
  @JoinColumn({ name: 'book_store_id' })
  store_book: BookStore;
}
