import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import UserRole from './user-role.entity';

@Entity({ name: 'roles' })
export default class Role {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  public ID: bigint;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  public key: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

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

  @OneToMany(() => UserRole, (target) => target.role)
  user_roles: Role[];
}
