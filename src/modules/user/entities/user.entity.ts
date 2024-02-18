import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  public ID: bigint;

  @Column({ unique: true, type: 'varchar', length: 50 })
  public uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public name: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  public email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  public password: string;

  @Column({ type: 'boolean', default: true })
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
