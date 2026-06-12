import React from 'react';

export default function MessageBubble({ chat, message, previousMessage, index, onContextMenu }) {
  const isMe = message.sender === 'me';
  const isFirstInGroup = index === 0 || previousMessage?.sender !== message.sender;
  const radiusClass = isFirstInGroup ? (isMe ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm') : 'rounded-2xl';
  const mtClass = index === 0 ? 'mt-0' : (isFirstInGroup ? 'mt-6' : 'mt-1');

  return (
    <div className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'} ${mtClass} space-y-1`}>
      {isFirstInGroup && message.senderName && chat.isGroup && !isMe && (
        <span className="ml-10 mb-0.5 text-[11px] font-bold text-slate-500">{message.senderName}</span>
      )}

      <div className={`flex items-end space-x-2 w-full group relative ${isMe ? 'justify-end' : 'justify-start'}`}>
        {!isMe && chat.isGroup && (
          isFirstInGroup ? (
            <img className="h-8 w-8 rounded-full object-cover shrink-0" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(message.senderName || chat.name)}&background=random`} alt="" />
          ) : (
            <div className="w-8 shrink-0"></div>
          )
        )}

        <div className={`relative flex max-w-md flex-col px-3 py-2 text-left shadow-sm md:max-w-lg ${radiusClass} ${isMe ? 'bg-brand-600 text-white' : 'bg-white text-slate-800 border border-slate-100'}`}>
          {message.replyTo && (
            <div className={`mb-1.5 rounded px-2 py-1 border-l-[3px] ${isMe ? 'bg-black/10 border-emerald-400' : 'bg-slate-100 border-brand-500'}`}>
              <p className={`text-xs font-bold ${isMe ? 'text-emerald-300' : 'text-brand-600'}`}>{message.replyTo.sender}</p>
              <p className={`text-xs truncate max-w-[200px] sm:max-w-xs ${isMe ? 'text-white/90' : 'text-slate-500'}`}>{message.replyTo.text}</p>
            </div>
          )}

          {message.text && (
            <div className="flex flex-wrap items-end justify-end gap-x-3">
              <p className="text-sm flex-1 text-left">{message.text}</p>
              {!message.file && (
                <span className={`text-[10px] shrink-0 mb-[-2px] flex items-center ${isMe ? 'text-brand-200' : 'text-slate-400'}`}>
                  {message.time}
                  {isMe && (
                    <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </span>
              )}
            </div>
          )}

          {message.file && (
            <div className="flex flex-col space-y-1 mt-1">
              <div className={`flex items-center p-2.5 rounded-lg border text-sm max-w-xs ${isMe ? 'bg-black/15 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                <div className={`p-2 rounded mr-3 shrink-0 ${isMe ? 'bg-brand-700/50 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-xs font-bold truncate leading-snug">{message.file.name}</p>
                  <span className={`text-[10px] block mt-0.5 ${isMe ? 'text-brand-200' : 'text-slate-400'}`}>{message.file.size}</span>
                </div>
                <a
                  href={message.file.url}
                  download={message.file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-1.5 rounded-full hover:bg-black/5 transition shrink-0 ${isMe ? 'text-brand-100 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
              <div className="flex justify-end">
                <span className={`text-[10px] shrink-0 flex items-center ${isMe ? 'text-brand-200' : 'text-slate-400'}`}>
                  {message.time}
                  {isMe && (
                    <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={(event) => onContextMenu(event, index, message.sender)}
            className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full shadow-sm focus:outline-none focus:opacity-100 ${isMe ? 'bg-brand-700 text-brand-100 hover:text-white' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
