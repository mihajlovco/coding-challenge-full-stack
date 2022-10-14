export default interface IRepository<T> {
  create: (entity: T) => T;
  delete: (id: number | string) => T;
  getAll: (): => T;
}
