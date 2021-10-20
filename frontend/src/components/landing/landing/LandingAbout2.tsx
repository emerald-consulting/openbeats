import React from 'react';
import {
  AnnotationIcon,
  GlobeAltIcon,
  MailIcon,
  MusicNoteIcon,
  UploadIcon,
} from '@heroicons/react/outline';

const transferFeatures = [
  {
    id: 1,
    name: 'Collaborate',
    description:
      'Collaborate with anyone in the world with Open Beats. Find others to collaborate with on the Open Beats social media site.',
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: 'Stream',
    description: 'Stream music from your favorite artists no matter how underground or mainstream.',
    icon: MusicNoteIcon,
  },
  {
    id: 3,
    name: 'Upload',
    description: 'Upload your own tracks that you produce in the Open Beats DAW.',
    icon: UploadIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
  },
  {
    id: 2,
    name: 'Reminder emails',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: MailIcon,
  },
];

export default function LandingAbout2() {
  return (
    <div className="pb-20 pt-3 bg-gray-50 overflow-hidden">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg
          className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Play Music
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              With Open Beats, you can stream and download music from your favorite artists, no
              matter how big or small.
            </p>

            <dl className="mt-10 space-y-10">
              {transferFeatures.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green3 text-white">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <img
              className="relative mx-auto"
              width={490}
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
        </div>

        <svg
          className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
        </svg>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Always in the loop
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus
                eligendi delectus, cum deleniti sunt in labore nihil quod quibusdam expedita nemo.
              </p>

              <dl className="mt-10 space-y-10">
                {communicationFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green3 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <svg
                className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect width={784} height={404} fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
              </svg>
              <img
                className="relative mx-auto"
                width={490}
                src="https://tailwindui.com/img/features/feature-example-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
