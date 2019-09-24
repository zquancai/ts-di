import 'reflect-metadata';

const inject = (params: any = ''): Function => {
  return (target: any, propertyKey: string) => {
    // 获取该属性的类型
    let typeClass = Reflect.getMetadata('design:type', target, propertyKey);
    const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
      writable: true,
      configurable: true
    };
    // 实例化修饰类
    descriptor.value = params ? new typeClass(params) : new typeClass();
    Reflect.defineProperty((target && target.prototype) || target, propertyKey, descriptor);
  };
};

class UserService {
  test: string;
  constructor(test: string) {
    this.test = test;
  }
  getUserById(id: string) {
    return `user id is ${id}`;
  }
}

class Person {
  @inject('test---') private userService: UserService;

  getUserInfo(id: string) {
    console.log(this.userService.getUserById(id), this.userService.test);
  }
}

// user id is 12
new Person().getUserInfo('12');
