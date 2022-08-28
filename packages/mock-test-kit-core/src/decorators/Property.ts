export const NoResetProperty =
  (property: string) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function () {
      const foundProperty = property.split('.').reduce((acc: unknown, prop) => {
        if (acc && (acc as Record<string, unknown>)[prop]) {
          return (acc as Record<string, unknown>)[prop];
        } else {
          return undefined;
        }
      }, this);

      if (foundProperty) {
        throw new Error(`No reset for ${property}.`);
      }

      return method.apply(this, arguments);
    };
  };
