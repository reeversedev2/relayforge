export type GetAllWorkflowById = {
  workflowId: string;
};

export type GetAllWorkflowsByUserId = {
  userId: string;
};

export type CreateWorkflowInput = {
  title: string;
  description: string;
  userId: string;
};
