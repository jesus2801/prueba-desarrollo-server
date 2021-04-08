import { Request, Response, NextFunction } from 'express';

import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

import { validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { Sale } from '../entity/Sale';
import { Employee } from '../entity/Employee';

export default {
  getEmployees: async (req: Request, res: Response) => {
    const repository = getRepository(Employee);

    const allEmployees = await repository.find();

    res.status(200).send(allEmployees);
  },

  getSales: async (req: Request, res: Response) => {
    const repository = getRepository(Sale);

    const allSales = await repository.find();

    res.status(200).send(allSales);
  },
};
