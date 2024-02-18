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
import Role from './role.entity';

@Entity({ name: 'user_roles' })
@Unique('user_role_unique', ['userID', 'roleID'])
export default class UserRole {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  public ID: bigint;

  @Column({ type: 'bigint', nullable: false, name: 'user_id' })
  public userID: bigint;

  @Column({ type: 'bigint', nullable: false, name: 'role_id' })
  public roleID: bigint;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Role, (target) => target.user_roles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
