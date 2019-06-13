const { expect } = require("chai");
const MyPromise = require("./promise");

describe("MyPromise", () => {
  describe("then", () => {
    it("Should call fullfilment listener when resolved.", done => {
      const promise = new MyPromise(resolve => {
        setTimeout(() => resolve(), 500);
      });

      promise.then(() => {
        expect(true).to.be.true;
        done();
      });
    });

    it("Should call fullfilment listener with arguments when resolved with arguments.", done => {
      const promise = new MyPromise(resolve => {
        setTimeout(() => resolve("Hai, then block"), 500);
      });

      promise.then(result => {
        expect(result).to.equal("Hai, then block");
        done();
      });
    });

    it("Should call onRejected when rejected.", done => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => reject(), 500);
      });

      promise.then(undefined, () => {
        expect(false).to.be.false;
        done();
      });
    });

    it("Should call onRejected when error in promise handler", done => {
      const promise = new MyPromise((resolve, reject) => {
        throw new Error("omg");
      });

      promise.then(undefined, error => {
        expect(error.message).to.equal("omg");
        done();
      });
    });
  });

  describe("catch", () => {
    it("Should call catch listener when rejected.", done => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => reject(), 500);
      });

      promise.catch(() => {
        expect(false).to.be.false;
        done();
      });
    });

    it("Should call catch listener with arguments when reject with arguments.", done => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => reject("Hai, catch block"), 500);
      });

      promise.catch(result => {
        expect(result).to.equal("Hai, catch block");
        done();
      });
    });
  });

  describe("resolve", () => {
    it("should return a promise", () => {
      const resolvedPromise = MyPromise.resolve();

      expect(resolvedPromise.then).to.be.ok;
      expect(resolvedPromise.catch).to.be.ok;
    });

    it("should resolve returned promise immediatly", done => {
      const resolvedPromise = MyPromise.resolve("resolved immediatly");

      resolvedPromise.then(message => {
        expect(message).to.equal("resolved immediatly");
        done();
      });
    });
  });

  describe("reject", () => {
    it("should return a promise", () => {
      const resolvedPromise = MyPromise.resolve();

      expect(resolvedPromise.then).to.be.ok;
      expect(resolvedPromise.catch).to.be.ok;
    });

    it("should reject returned promise immediatly", done => {
      const resolvedPromise = MyPromise.reject("rejected immediatly");

      resolvedPromise.catch(message => {
        expect(message).to.equal("rejected immediatly");
        done();
      });
    });
  });
});
