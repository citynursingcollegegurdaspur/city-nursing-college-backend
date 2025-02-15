import * as supplyService from "./supply.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createSupply = asyncHandler(
  async (req: Request, res: Response) => {
    //need check here to check if student exists and semster from request body is valid student course semster
    const result = await supplyService.createSupply(req.body);
    res.send(createResponse(result, "Supply created sucssefully"));
  },
);

export const updateSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.updateSupply(req.params.id, req.body);
    res.send(createResponse(result, "Supply updated sucssefully"));
  },
);

export const editSupply = asyncHandler(async (req: Request, res: Response) => {
  const result = await supplyService.editSupply(req.params.id, req.body);
  res.send(createResponse(result, "Supply updated sucssefully"));
});

export const deleteSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.deleteSupply(req.params.id);
    res.send(createResponse(result, "Supply deleted sucssefully"));
  },
);

export const getSupplyById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await supplyService.getSupplyById(req.params.id);
    res.send(createResponse(result));
  },
);
export const getSupplyCountOfStudentSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { student, semester, subject } = req.query;
    if (!student || !semester || !subject) {
      throw new Error("Student, semester, and subject are required");
    }

    const result = await supplyService.getSupplyCountOfStudentSubject({
      semester: semester.toString(), subject: subject.toString().toLowerCase(), student: student.toString()
    });
    res.send(createResponse(result));
  },
);

export const getAllSupply = asyncHandler(
  async (req: Request, res: Response) => {
    const studentRegistrationNumber = req.query?.studentRegistrationNumber ? req.query!.studentRegistrationNumber.toString() : undefined;
    const result = await supplyService.getAllSupplyWithPopulation(studentRegistrationNumber);
    res.send(createResponse(result));
  },
);
