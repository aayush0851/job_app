export abstract class BaseExporter<T> {
    protected abstract _map(model: T): Promise<any>;

    async export(model: T): Promise<any> {
        return this._map(model);
    }

    async exportList(models: T[]): Promise<any[]> {
        const transformedPromises = models.map((model) => {
            return this._map(model);
        });
        return await Promise.all(transformedPromises);
    }
}