import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'books' })
export default class Book {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  public ID: bigint;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public slug: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public author: string;

  @Column({ type: 'numeric', name: 'publish_date', default: 0 })
  publishDate: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public publisher: string;

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
}
