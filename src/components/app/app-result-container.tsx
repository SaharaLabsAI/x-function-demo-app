"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";

export const AppResultContainer = ({ result = "" }: { result?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className='mt-6'
    >
      <div className='glass-effect border border-primary/30 rounded-xl p-6 relative overflow-hidden'>
        <div className='absolute inset-0 -z-10 opacity-10 pointer-events-none'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-primary/40 rounded-full blur-2xl' />
          <div className='absolute bottom-0 left-0 w-32 h-32 bg-accent/30 rounded-full blur-2xl' />
        </div>

        <div className='flex items-center gap-3 mb-4 pb-3 border-b border-primary/20'>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className='flex-shrink-0'
          >
            <svg
              className='w-6 h-6 text-primary'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className='text-lg font-semibold text-primary'
          >
            Deployment Result
          </motion.h3>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='relative'
        >
          <div className='bg-dark/50 rounded-lg p-4 border border-primary/10'>
            <pre className='text-sm text-gray-300 whitespace-pre-wrap break-words font-mono leading-relaxed'>
              {result}
            </pre>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.clipboard.writeText(result || "");
              toast.success("Copied to clipboard!");
            }}
            className='absolute top-2 right-2 p-2 rounded-md bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-colors group'
            title='Copy to clipboard'
          >
            <svg
              className='w-4 h-4 text-primary group-hover:text-primary/80'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
              />
            </svg>
          </motion.button>
        </motion.div>

        <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent' />
      </div>
    </motion.div>
  );
};
