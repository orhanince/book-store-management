import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import StoreBook from './store-book.entity';

@Entity({ name: 'book_stores' })
export default class BookStore {
  [x: string]: any;
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  public ID: bigint;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;

  @Column({ type: 'text', nullable: true })
  public slogan: string;

  @Column({ type: 'text', nullable: true })
  public address: string;

  @Column({ type: 'bool', nullable: false })
  public active: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
    default: null
  })
  deletedAt: Date;
  @OneToMany(() => StoreBook, (target) => target.store_book)
  store_books: BookStore[];
}
