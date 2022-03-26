import { Request, Response, Router } from 'express';
import { IClubsService } from '../interfaces';

export class ClubsRouter {
  constructor(
    public router: Router,
    private clubsService: IClubsService,
  ) {
    this.getAllClubs();
    this.getClubById();
  }

  private getAllClubs(): void {
    this.router.get(
      '/',
      async (req: Request, res: Response) => {
        const { code, data } = await this.clubsService.getAllClubs();
        return res.status(code).json(data);
      },
    );
  }

  private getClubById(): void {
    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await this.clubsService.getClubById(req.params.id);
        return res.status(code).json(data);
      },
    );
  }
}
