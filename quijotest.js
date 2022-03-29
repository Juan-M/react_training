const o = {
  var: 'some attrib',
  foo: function () {
    console.log(this);
  },
  baz: 'some other val',
};

const oo = {
  var: 'some attrib',
  foo: () => {
    console.log(this);
  },
  baz: 'some other val',
};

o.foo();
oo.foo();
