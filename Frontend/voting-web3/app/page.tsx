"use client";

import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { VOTING_ABI, VOTING_CONTRACT_ADDRESS } from "../src/constant/contract";
import { ConnectKitButton } from "connectkit"; // Tambahkan ini agar user bisa login

// Definisikan Interface agar TypeScript tidak error (Informatics Engineering Style)
interface Candidate {
  id: bigint;
  name: string;
  totalVote: bigint;
}

export default function Home() {
  const { isConnected, address } = useAccount();
  
  // Ambil data kandidat
  const { data: candidates, isLoading, refetch } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_ABI,
    functionName: "getAllCandidates",
  });

  // Hook untuk mengirim transaksi
  const { data: hash, writeContract, isPending: isVoting } = useWriteContract();

  // Hook untuk memantau transaksi sampai berhasil di blockchain
  const { isLoading: isWaitingForTx } = useWaitForTransactionReceipt({
    hash,
  });

  const handleVote = (id: bigint) => {
    if (!isConnected) return alert("Connect You Wallet First!");
    
    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_ABI,
      functionName: "voteCandidate",
      args: [id],
    }, {
      onSuccess: () => {
        alert("Transaction Sended! Wait for a moment...");
        // Refresh data otomatis setelah transaksi selesai bisa dilakukan di sini
      }
    });
  };

  const candidateList = candidates as Candidate[];

  return (
    <main className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Decentralized Voting</h1>
          <p className="text-gray-500">Choose Your Candidate</p>
        </div>
        <ConnectKitButton />
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Synchronize to blockchain...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidateList && candidateList.length > 0 ? (
            candidateList.map((candidate) => (
              <div key={candidate.id.toString()} className="p-6 border rounded-2xl shadow-sm bg-white hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{candidate.name}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    ID: {candidate.id.toString()}
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Total Vote</p>
                  <p className="text-4xl font-black text-blue-600">{candidate.totalVote.toString()}</p>
                </div>

                <button 
                  onClick={() => handleVote(candidate.id)}
                  disabled={isVoting || isWaitingForTx || !isConnected}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex justify-center items-center gap-2"
                >
                  {(isVoting || isWaitingForTx) ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Loading...
                    </>
                  ) : "Give Vote"}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-12 border-2 border-dashed rounded-2xl bg-white">
              <p className="text-gray-500">No candidate participate.</p>
            </div>
          )}
        </div>
      )}

      {/* Informasi Transaksi Terakhir */}
      {hash && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          Transaction Successful! <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" className="underline font-bold">Check at Etherscan</a>
        </div>
      )}
    </main>
  );
}