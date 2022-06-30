import {
  compile, middleware, serialize, stringify,
} from 'stylis';
import { get, def } from 'bdd-lazy-var';

import stylisPx2RemPlugin from '../src';

def('stylisCompile', () => serialize(
  compile(get('css')),
  middleware([stylisPx2RemPlugin(get('configuration')), stringify]),
));

describe('stylis compilation with stylisPx2RemPlugin', () => {
  describe('default configuration', () => {
    def('configuration', () => ({}));

    describe('when the declaration has no px value', () => {
      def('css', () => 'width:1rem;');

      it('leaves the css intact', () => {
        expect(
          get('stylisCompile'),
        ).toEqual(get('css'));
      });
    });

    describe('when the declaration has one px value', () => {
      def('css', () => 'width:16px;');

      it('translates the px to rem', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('width:1rem;');
      });
    });

    describe('when the declaration has multiple px values', () => {
      def('css', () => 'margin: 0 8px 16px;');

      it('translates the px to rem', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('margin:0 0.5rem 1rem;');
      });
    });

    describe('when the declaration has a Px value', () => {
      def('css', () => 'width:16Px;');

      it('leaves the Px intact', () => {
        expect(
          get('stylisCompile'),
        ).toEqual(get('css'));
      });
    });

    describe('when the declaration is in a rule', () => {
      def('css', () => '.myClass{width:16px;}');

      it('translates the px to rem', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('.myClass{width:1rem;}');
      });
    });

    describe('when there are multiple declarations', () => {
      def('css', () => '.myClass{width:16px;height:32px;}');

      it('translates the px to rem', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('.myClass{width:1rem;height:2rem;}');
      });
    });

    describe('when the declaration has px in a string', () => {
      def('css', () => 'content:"px";');

      it('leaves the css intact', () => {
        expect(
          get('stylisCompile'),
        ).toEqual(get('css'));
      });
    });

    describe('when the declaration has px in an embedded image', () => {
      def('css', () => 'background-image:url("data:image/gif;base64,64px=");');

      it('leaves the css intact', () => {
        expect(
          get('stylisCompile'),
        ).toEqual(get('css'));
      });
    });
  });

  describe('custom configuration', () => {
    describe('remSize', () => {
      def('configuration', () => ({ remSize: 10 }));
      def('css', () => 'width:10px;');

      it('translates the px with the new rem size', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('width:1rem;');
      });
    });

    describe('allowList', () => {
      def('configuration', () => ({ allowList: ['font-size'] }));
      def('css', () => 'font-size:14px;width:10px;');

      it('only translates allowList declarations', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('font-size:0.875rem;width:10px;');
      });
    });

    describe('blockList', () => {
      def('configuration', () => ({ blockList: ['font-size'] }));
      def('css', () => 'font-size:14px;width:10px;');

      it('does not translate blockList declarations', () => {
        expect(
          get('stylisCompile'),
        ).toEqual('font-size:14px;width:0.625rem;');
      });
    });
  });
});
