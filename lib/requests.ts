import type { NextApiRequest } from "next";

/**
 * @param req NextApiRequest
 * @param maxLimit number
 * @param maxOffset number
 * @description Format limit and offset for query search in Algolia
 * @returns Object<{limit,offset}>
 */
export const getOffsetAndLimit = (
  req: NextApiRequest,
  maxLimit = 100,
  maxOffset = 10000
): { limit: number; offset: number } => {
  const queryLimit = parseInt((req.query.limit as string) || "0");
  const queryOffset = parseInt((req.query.offset as string) || "0");
  let limit = 10;
  if (queryLimit > 0 && queryLimit <= maxLimit) {
    limit = queryLimit;
  } else if (queryLimit > maxLimit) {
    limit = maxLimit;
  }

  const offset = queryOffset < maxOffset ? queryOffset : 0;
  return { limit, offset };
};
