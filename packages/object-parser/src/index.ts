export class ObjectParser {
  private value: unknown

  constructor(value: unknown) {
    this.value = value
  }

  public has(...path: string[]): boolean {
    if (path.length < 1) {
      throw new TypeError("Invalid path")
    }

    let value = this.value

    for (const key of path) {
      if (typeof value !== "object" || value === null) {
        return false
      }
      if (!(key in value)) {
        return false
      }
      value = value[key as keyof typeof value]
    }

    return true
  }

  public get(...path: string[]): unknown {
    if (path.length < 1) {
      throw new TypeError("Invalid path")
    }
    let value = this.value
    for (let i = 0; i < path.length; i++) {
      if (typeof value !== "object" || value === null) {
        throw new Error(
          `Value in path ${path.slice(0, i + 1).join(".")} is not an object`,
        )
      }
      if (!(path[i] in value)) {
        throw new Error(`Path ${path.slice(0, i + 1).join(".")} does not exist`)
      }
      value = value[path[i] as keyof typeof value]
    }
    return value
  }

  public isString(...path: string[]): boolean {
    return typeof this.get(...path) === "string"
  }

  public getString(...path: string[]): string {
    const value = this.get(...path)
    if (typeof value !== "string") {
      throw new Error(`Value in path ${path.join(".")} is not a string`)
    }
    return value
  }

  public isNumber(...path: string[]): boolean {
    return typeof this.get(...path) === "number"
  }

  public getNumber(...path: string[]): number {
    const value = this.get(...path)
    if (typeof value !== "number") {
      throw new Error(`Value in path ${path.join(".")} is not a number`)
    }
    return value
  }

  public isBoolean(...path: string[]): boolean {
    return typeof this.get(...path) === "boolean"
  }

  public getBoolean(...path: string[]): boolean {
    const value = this.get(...path)
    if (typeof value !== "boolean") {
      throw new Error(`Value in path ${path.join(".")} is not a boolean`)
    }
    return value
  }

  public isBigInt(...path: string[]): boolean {
    return typeof this.get(...path) === "bigint"
  }

  public getBigInt(...path: string[]): bigint {
    const value = this.get(...path)
    if (typeof value !== "bigint") {
      throw new Error(`Value in path ${path.join(".")} is not a bigint`)
    }
    return value
  }

  public isObject(...path: string[]): boolean {
    const value = this.get(...path)
    return typeof value === "object" && value !== null
  }

  public getObject(...path: string[]): object {
    const value = this.get(...path)
    if (typeof value !== "object" || value === null) {
      throw new Error(`Value in path ${path.join(".")} is not an object`)
    }
    return value
  }

  public isArray(...path: string[]): boolean {
    return Array.isArray(this.get(...path))
  }

  public getArray(...path: string[]): unknown[] {
    const value = this.get(...path)
    if (!Array.isArray(value)) {
      throw new Error(`Value in path ${path.join(".")} is not an array`)
    }
    return value
  }

  public isNull(...path: string[]): boolean {
    const value = this.get(...path)
    return value === null
  }

  public isUndefined(...path: string[]): boolean {
    const value = this.get(...path)
    return value === undefined
  }

  public createParser(...path: string[]): ObjectParser {
    return new ObjectParser(this.getObject(...path))
  }
}
