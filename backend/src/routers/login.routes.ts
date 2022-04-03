import { Router, Request, Response } from 'express';
import { TBodyValidator } from '../typescript/types';
import { ILoginService, IMiddlewares } from '../typescript/interfaces';

export class LoginRouter {
  constructor(
    public router: Router,
    private loginService: ILoginService,
    private loginBodyValidator: TBodyValidator,
    private middlewares: IMiddlewares,
  ) {
    this.login();
    this.validateLogin();
  }

  private login(): void {
    this.router.post(
      '/',
      this.middlewares.validateBody(this.loginBodyValidator),
      async (req: Request, res: Response) => {
        const { code, data } = await this.loginService.login(req.body);
        return res.status(code).json(data);
      },
    );
  }

  private validateLogin(): void {
    this.router.get(
      '/validate',
      this.middlewares.jwtAuth,
      async (req: Request, res: Response) => res.status(200).send(req.tokenData!.role),
    );
  }
}
