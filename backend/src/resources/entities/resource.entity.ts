import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ResourceType {
  DOCUMENT = 'document',
  LINK = 'link',
  FILE = 'file',
  VIDEO = 'video',
  IMAGE = 'image',
  OTHER = 'other',
}

export enum ResourceStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.OTHER,
  })
  type: ResourceType;

  @Column({ nullable: true })
  category: string | null;

  @Column()
  url: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({
    type: 'enum',
    enum: ResourceStatus,
    default: ResourceStatus.ACTIVE,
  })
  status: ResourceStatus;

  @Column({ nullable: true })
  author: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

