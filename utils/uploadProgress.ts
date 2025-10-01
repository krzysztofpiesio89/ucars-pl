export interface UploadJob {
  status: 'starting' | 'processing' | 'completed' | 'failed';
  total: number;
  processed: number;
  message?: string;
}

// To prevent the in-memory store from being cleared during hot-reloading in development,
// we attach it to the `global` object.
declare global {
  var __jobStore: Map<string, UploadJob> | undefined;
}

const jobStore = global.__jobStore || (global.__jobStore = new Map<string, UploadJob>());

export const startJob = (jobId: string): void => {
  jobStore.set(jobId, {
    status: 'starting',
    total: 0,
    processed: 0,
  });
};

export const updateJobProgress = (
  jobId: string,
  processed: number,
  total: number
): void => {
  const job = jobStore.get(jobId);
  if (job) {
    job.status = 'processing';
    job.processed = processed;
    job.total = total;
  }
};

export const completeJob = (jobId: string, message: string): void => {
  const job = jobStore.get(jobId);
  if (job) {
    job.status = 'completed';
    job.processed = job.total;
    job.message = message;
  }
};

export const failJob = (jobId: string, message: string): void => {
  const job = jobStore.get(jobId);
  if (job) {
    job.status = 'failed';
    job.message = message;
  }
};

export const getJob = (jobId: string): UploadJob | undefined => {
  return jobStore.get(jobId);
};
