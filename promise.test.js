const { expect } = require("chai");
const MyPromise = require("./promise");

const DELAY = 10;

describe("MyPromise", () => {
  describe("on success", () => {
    it("should call fullfillment handler", done => {
      const promise = new MyPromise(resolve => {
        setTimeout(() => resolve(), DELAY);
      });

      promise.then(() => {
        expect(true).to.be.true;
        done();
      });
    });

    it("should call fullfillment handler with arguments.", done => {
      const promise = new MyPromise(resolve => {
        setTimeout(() => resolve("Hai, then block"), DELAY);
      });

      promise.then(result => {
        expect(result).to.equal("Hai, then block");
        done();
      });
    });
  });

  describe("on failure", () => {
    it("should call catch listener if available", done => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => reject(), DELAY);
      });

      promise.catch(() => {
        expect(false).to.be.false;
        done();
      });
    });

    it("should call catch listener with arguments with arguments", done => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => reject("Hai, catch block"), DELAY);
      });

      promise.catch(result => {
        expect(result).to.equal("Hai, catch block");
        done();
      });
    });

    it("should call rejection handler", done => {
      const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => reject(), DELAY);
      });

      promise.then(undefined, () => {
        expect(false).to.be.false;
        done();
      });
    });

    it("Should call rejection handler on error", done => {
      const promise = new MyPromise((resolve, reject) => {
        throw new Error("omg");
      });

      promise.then(undefined, error => {
        expect(error.message).to.equal("omg");
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
