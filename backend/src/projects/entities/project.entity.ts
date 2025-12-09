import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
  BLOCKED = 'Blocked',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  projectCode: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
  })
  status: ProjectStatus;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'int', default: 0 })
  tickets: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

